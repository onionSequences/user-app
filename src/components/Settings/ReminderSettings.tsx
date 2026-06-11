'use client';

import { useState, useTransition } from 'react';
import { FiBell } from 'react-icons/fi';
import { updateReminderSettings } from '@/lib/actions/settings';
import { UserSettings } from '@/types/settings';

type Props = {
  settings: UserSettings;
};

export function ReminderSettings({ settings }: Props) {
  const [form, setForm] = useState({
    remindersEnabled: settings.remindersEnabled,
    notifyDayBefore: settings.notifyDayBefore,
    notifyDayOf: settings.notifyDayOf,
    timezone: settings.timezone,
  });
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const save = (next: typeof form) => {
    const previous = form;
    setForm(next);
    setError('');
    setSaved(false);

    startTransition(async () => {
      const result = await updateReminderSettings(next);

      if (!result.success) {
        setError(result.error);
        setForm(previous);
        return;
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  const handleMasterToggle = () => {
    const timezone =
      form.timezone === 'UTC'
        ? Intl.DateTimeFormat().resolvedOptions().timeZone
        : form.timezone;

    save({
      ...form,
      timezone,
      remindersEnabled: !form.remindersEnabled,
    });
  };

  const handleDayBeforeToggle = () => {
    save({ ...form, notifyDayBefore: !form.notifyDayBefore });
  };

  const handleDayOfToggle = () => {
    save({ ...form, notifyDayOf: !form.notifyDayOf });
  };

  const disabled = isPending || !settings.email;

  return (
    <div className="settings-reminders-card">
      <div className="settings-reminders-header">
        <FiBell />
        <div>
          <h3>Birthday reminders</h3>
          <p>
            {settings.email
              ? `Emails are sent to ${settings.email}`
              : 'Add an email to your account to enable reminders.'}
          </p>
        </div>
      </div>

      <label className="settings-toggle">
        <input
          type="checkbox"
          checked={form.remindersEnabled}
          onChange={handleMasterToggle}
          disabled={disabled}
        />
        <span className="settings-toggle-label">
          <strong>Enable email reminders</strong>
          <small>Get notified about upcoming birthdays</small>
        </span>
      </label>

      <label
        className={`settings-toggle ${!form.remindersEnabled ? 'settings-toggle--disabled' : ''}`}
      >
        <input
          type="checkbox"
          checked={form.notifyDayBefore}
          onChange={handleDayBeforeToggle}
          disabled={disabled || !form.remindersEnabled}
        />
        <span className="settings-toggle-label">
          <strong>Day before</strong>
          <small>Remind me one day before a birthday</small>
        </span>
      </label>

      <label
        className={`settings-toggle ${!form.remindersEnabled ? 'settings-toggle--disabled' : ''}`}
      >
        <input
          type="checkbox"
          checked={form.notifyDayOf}
          onChange={handleDayOfToggle}
          disabled={disabled || !form.remindersEnabled}
        />
        <span className="settings-toggle-label">
          <strong>On the day</strong>
          <small>Remind me on the morning of the birthday</small>
        </span>
      </label>

      {form.remindersEnabled && (
        <p className="settings-timezone">
          Reminders use your local timezone: <code>{form.timezone}</code>
        </p>
      )}

      {error && <p className="settings-error">{error}</p>}
      {saved && <p className="settings-saved">Settings saved</p>}
    </div>
  );
}
