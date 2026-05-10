import { useState, type FormEvent } from 'react';
import { Button } from '../common/Button';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <form className="border border-white/10 bg-rafin-panel p-6 sm:p-8" onSubmit={handleSubmit}>
      <div>
        <p className="eyebrow">Contact Sales</p>
        <h2 className="mt-3 text-3xl text-white">Start a direct equipment conversation</h2>
        <p className="mt-3 text-rafin-muted-light">
          This form is frontend-only. Submit your request and the preview will confirm success locally.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-white/72">
          Full name
          <input className="field" name="name" required type="text" />
        </label>
        <label className="block text-sm text-white/72">
          Company name
          <input className="field" name="company" required type="text" />
        </label>
        <label className="block text-sm text-white/72">
          Email
          <input className="field" name="email" required type="email" />
        </label>
        <label className="block text-sm text-white/72">
          Phone
          <input className="field" name="phone" required type="tel" />
        </label>
        <label className="block text-sm text-white/72 sm:col-span-2">
          Message
          <textarea className="field min-h-[160px]" name="message" required />
        </label>
      </div>

      <Button className="mt-6" type="submit">
        Send Request
      </Button>
      {submitted ? (
        <p className="mt-4 text-sm text-rafin-gold-soft">
          Sales inquiry captured for the preview. No backend or payment flow has been triggered.
        </p>
      ) : null}
    </form>
  );
}
