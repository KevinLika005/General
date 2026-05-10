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
          className="h-11 w-full border border-white/10 bg-white/6 px-4 py-3 text-white placeholder:text-white/35"
          placeholder="name@company.com"
          required
          type="email"
        />
      </label>
      <Button className="w-full" type="submit">
        Get alerts
      </Button>
      {submitted ? (
        <p className="text-sm text-rafin-gold-soft">
          Alert request saved for this frontend preview. Rafin can connect delivery later.
        </p>
      ) : null}
    </form>
  );
}
