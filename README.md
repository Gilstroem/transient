<p align="center">
    <img alt="lt3 logo" src="https://gilstroem.com/transientlogo.png" width="400" />
</p>
<h1 align="center">
  React hook for shared transient state
</h1>

<p align="center">
  
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@gilstroem/transient">
    <img alt="" src="https://badgen.net/npm/v/@gilstroem/transient">
  </a>
  <a aria-label="Package size" href="https://bundlephobia.com/result?p=@gilstroem/transient">
    <img alt="" src="https://badgen.net/bundlephobia/minzip/@gilstroem/transient">
  </a>
  <a aria-label="License" href="https://github.com/gilstroem/transient/blob/master/LICENSE">
    <img alt="" src="https://badgen.net/npm/license/@gilstroem/transient">
  </a>
</p>

A simple, tiny, library to automatically handle transient state, such as notifications, messages, or anything else that has a specific lifetime. An alternative to complex state, or messy passing down of state to emit and subscribe to events between children/siblings.

<br/>

## Quick Start

```js
// Subscriber example
import useTransient from "@gilstroem/transient";

function Notifications() {
  const notifications = useTransient();

  return (
    <ul>
      {notifications.map((n) => (
        <li key={n}>{n}</li>
      ))}
    </ul>
  );
}

...

// Insertion example
import { insert } from "@gilstroem/transient";

function Greet({ name }) {
  return (
    <button onClick={() => insert(`Welcome back, ${name}`)}>Greet me 👋</button>
  );
}
```

<br/>

## Usage

```
npm install @gilstroem/transient
```

<br/>

## API

### useTransient

```js
import useTransient from "@gilstroem/transient";
const data = useTransient(key);
```

#### Parameters

- `key`: (_optional_) a unique key string used to denote the namespace of the state.

#### Return Values

- `data`: an array of the data for the given key. Defaults to an empty array (`[]`).

<br/>

### insert

```js
import { insert } from "@gilstroem/transient";
insert(`Hello, World!`, 6000, "notifications");
```

#### Parameters

- `data`: a value of any type to be inserted and removed after a `lifetime`.
- `lifetime`: (_optional_) a lifetime for the data in milliseconds (`number`).
- `key`: (_optional_) a key string denoting which namespace the date should be inserted into.

#### Return Values

**N/A**

<br/>

## Examples

- [Simple](#simple)
- [Namespaced](#namespaced)
- [Lifetimes](#lifetimes)
- [Dependent Fetching](#dependent-fetching)
- [Notifications use-case example (complex data)](<#notifications-use-case-example-(complex-data)>)
- [Typescript example](#typescript-example)

<br/>

### Simple

```js
import useTransient from "@gilstroem/transient";

function Notifications() {
  const notifications = useTransient();

  return (
    <ul>
      {notifications.map((n) => (
        <li key={n}>{n}</li>
      ))}
    </ul>
  );
}

...

import { insert } from "@gilstroem/transient";

function Greet({ name }) {
  return (
    <button onClick={() => insert(`Welcome back, ${name}`)}>Greet me 👋</button>
  );
}
```

<br/>

### Namespaced

```js
import useTransient from "@gilstroem/transient";

function Notifications() {
  const notifications = useTransient("notifications");
  const alerts = useTransient("alerts");

  return (
    <>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
      <h2>Alerts</h2>
      <ul>
        {alerts.map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>
    </>
  );
}

...

import { insert } from "@gilstroem/transient";

function Greet({ name }) {
  return (
    <>
      <button
        onClick={() => insert(`Welcome back, ${name}`, null, "notifications")}
      >
        Greet me 👋
      </button>
      <button
        onClick={() => insert(`Look behind you, ${name}`, null, "alerts")}
      >
        Warn me 🚨
      </button>
    </>
  );
}
```

<br/>

### Lifetimes

```js
import { insert } from "@gilstroem/transient";
...
insert(`I am here for 5 seconds, the default lifetime`);
...
insert(`I will be gone in a second 👋`, 1000);
...
insert(`I will stick around for a minute 🐒`, 60000);
```

<br/>

### Notifications use-case example (complex data)

```js
import useTransient from "@gilstroem/transient";

function Notifications() {
  const notifications = useTransient("notifications");

  return (
    <ul>
      {notifications.map(({ text, type }) => (
        <li className={`notification type-${type}`} key={text}>
          {text}
        </li>
      ))}
    </ul>
  );
}

// ...

import { insert } from "@gilstroem/transient";

function CreateTodo() {
  //... form state logic

  const handleSubmit = () => {
    try {
      // ... submit logic
      insert(
        { text: `Your todo was saved!`, type: "positive" },
        4000,
        "notifications"
      );
    } catch (err) {
      insert(
        {
          text: `Your todo could not be saved, try again later!`,
          type: "warning",
        },
        6000,
        "notifications"
      );
    }
  };

  return (
    // ... render a form
    <button onClick={handleSubmit}>Save new todo</button>
  );
}
```

<br/>

### Typescript example

```js
import useTransient from "@gilstroem/transient";

export enum NotificationType {
  NORMAL,
  WARNING,
  ALERT,
}

export interface Notification {
  text: string
  type: NotificationType
  id: string
}

const Notifications: FunctionComponent = () => {
  const notifications: Notification[] = useTransient<Notification>("notifications");

  return (
    <ul>
      {notifications.map(({ text, type, id }) => (
        <li className={`notification type-${type}`} key={id}>
          {text}
        </li>
      ))}
    </ul>
  );
}

// ...

import { insert } from "@gilstroem/transient";
import { v4 as uuid } from "uuid";
import { Notification, NotificationType } from "../path-to-notifications-component"

const CreateTodo: FunctionComponent = () => {
  //... form state logic

  const handleSubmit = () => {
    try {
      // ... submit logic
      insert<Notification>(
        {
          text: `Your todo was saved! 👍`,
          type: NotificationType.NORMAL,
          id: uuid
        },
        4000,
        "notifications"
      );
    } catch (err) {
      insert<Notification>(
        {
          text: `Your todo could not be saved 👎 try again later!`,
          type: NotificationType.ERROR,
          id: uuid
        },
        6000,
        "notifications"
      );
    }
  };

  return (
    // ... render a form
    <button onClick={handleSubmit}>Save new todo</button>
  );
}
```

<br/>

## Author

- Nikolaj Alexander Gilstroem ([@gilstroem](https://twitter.com/gilstroem)) – [gilstroem.com](https://gilstroem.com)

<br/>

## License

The MIT License.
