export type SupportedFormType = 'contact' | 'request_quote';

type ErrorCode =
  | 'CONFIG_ERROR'
  | 'VALIDATION_ERROR'
  | 'SPAM_REJECTED'
  | 'MAIL_FAILED'
  | 'SERVER_ERROR';

export interface FormSubmissionSuccess {
  ok: true;
  code: 'MAIL_SENT';
  message: string;
  requestId: string;
}

export interface FormSubmissionFailure {
  ok: false;
  code: ErrorCode;
  message: string;
  fields: string[];
}

export type FormSubmissionResult = FormSubmissionSuccess | FormSubmissionFailure;

interface SubmitFormOptions {
  extraFields?: Record<string, string>;
  form: HTMLFormElement;
  formType: SupportedFormType;
}

const CONFIG_ERROR_MESSAGE = 'Form submissions are not configured right now. Please try again later.';
const NETWORK_ERROR_MESSAGE = 'The request could not be sent right now. Please try again later.';
const RESPONSE_ERROR_MESSAGE = 'The request could not be processed right now. Please try again later.';

function getMailEndpoint() {
  return import.meta.env.VITE_MAIL_ENDPOINT?.trim() ?? '';
}

function isSubmissionFailure(value: unknown): value is FormSubmissionFailure {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<FormSubmissionFailure>;
  return candidate.ok === false && typeof candidate.code === 'string' && typeof candidate.message === 'string';
}

function isSubmissionSuccess(value: unknown): value is FormSubmissionSuccess {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<FormSubmissionSuccess>;
  return candidate.ok === true && candidate.code === 'MAIL_SENT' && typeof candidate.message === 'string' && typeof candidate.requestId === 'string';
}

export function createFormStartedAt() {
  return new Date().toISOString();
}

export async function submitForm({
  extraFields = {},
  form,
  formType,
}: SubmitFormOptions): Promise<FormSubmissionResult> {
  const endpoint = getMailEndpoint();

  if (!endpoint) {
    return {
      ok: false,
      code: 'CONFIG_ERROR',
      message: CONFIG_ERROR_MESSAGE,
      fields: [],
    };
  }

  const formData = new FormData(form);
  const sourcePath =
    typeof window === 'undefined'
      ? ''
      : `${window.location.pathname}${window.location.search}`;
  const sourceUrl = typeof window === 'undefined' ? '' : window.location.href;

  formData.set('formType', formType);
  formData.set('company_website', String(formData.get('company_website') ?? '').trim());
  formData.set('form_started_at', String(formData.get('form_started_at') ?? createFormStartedAt()));
  formData.set('source_path', sourcePath);
  formData.set('source_url', sourceUrl);

  Object.entries(extraFields).forEach(([key, value]) => {
    formData.set(key, value);
  });

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });

    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return {
        ok: false,
        code: 'SERVER_ERROR',
        message: RESPONSE_ERROR_MESSAGE,
        fields: [],
      };
    }

    let payload: unknown;

    try {
      payload = await response.json();
    } catch {
      return {
        ok: false,
        code: 'SERVER_ERROR',
        message: RESPONSE_ERROR_MESSAGE,
        fields: [],
      };
    }

    if (isSubmissionSuccess(payload)) {
      return payload;
    }

    if (isSubmissionFailure(payload)) {
      return {
        ...payload,
        fields: Array.isArray(payload.fields) ? payload.fields.filter((field) => typeof field === 'string') : [],
      };
    }

    return {
      ok: false,
      code: 'SERVER_ERROR',
      message: RESPONSE_ERROR_MESSAGE,
      fields: [],
    };
  } catch {
    return {
      ok: false,
      code: 'MAIL_FAILED',
      message: NETWORK_ERROR_MESSAGE,
      fields: [],
    };
  }
}
