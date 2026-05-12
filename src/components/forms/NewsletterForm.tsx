import { useState, type FormEvent } from 'react';
import { Button } from '../common/Button';

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
      <label className="block">
        <span className="sr-only">Email address</span>
        <input
          className="h-11 w-full rounded-none border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/45"
          placeholder="name@company.com"
          required
          type="email"
        />
      </label>
      <Button className="w-full" type="submit">
        Get alerts
      </Button>
      {submitted ? (
        <p aria-live="polite" className="text-sm text-white/80" role="status">
          Alert request recorded in this frontend build. Delivery and mailing integration can be connected later.
        </p>
      ) : null}
    </form>
  );
}
