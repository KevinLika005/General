import i18n from '../i18n/config';

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

function getMailEndpoint() {
  return import.meta.env.VITE_MAIL_ENDPOINT?.trim() ?? '';
}

function isErrorCode(value: string): value is ErrorCode {
  return (
    value === 'CONFIG_ERROR' ||
    value === 'VALIDATION_ERROR' ||
    value === 'SPAM_REJECTED' ||
    value === 'MAIL_FAILED' ||
    value === 'SERVER_ERROR'
  );
}

function isSubmissionFailure(value: unknown): value is FormSubmissionFailure {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<FormSubmissionFailure>;
  return candidate.ok === false && typeof candidate.code === 'string' && isErrorCode(candidate.code);
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

function getFailureMessage(code: ErrorCode) {
  return i18n.t(`forms.shared.errors.${code}`);
}

function getSuccessMessage(formType: SupportedFormType) {
  return i18n.t(formType === 'contact' ? 'forms.contact.success' : 'forms.quote.success');
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
      message: getFailureMessage('CONFIG_ERROR'),
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
        message: getFailureMessage('SERVER_ERROR'),
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
        message: getFailureMessage('SERVER_ERROR'),
        fields: [],
      };
    }

    if (isSubmissionSuccess(payload)) {
      return {
        ...payload,
        message: getSuccessMessage(formType),
      };
    }

    if (isSubmissionFailure(payload)) {
      return {
        ...payload,
        message: getFailureMessage(payload.code),
        fields: Array.isArray(payload.fields) ? payload.fields.filter((field) => typeof field === 'string') : [],
      };
    }

    return {
      ok: false,
      code: 'SERVER_ERROR',
      message: getFailureMessage('SERVER_ERROR'),
      fields: [],
    };
  } catch {
    return {
      ok: false,
      code: 'MAIL_FAILED',
      message: getFailureMessage('MAIL_FAILED'),
      fields: [],
    };
  }
}
