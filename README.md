<p align="center">
    <img alt="lt3 logo" src="https://gilstroem.com/transientlogo.png" width="400" />
</p>
<h1 align="center">
  React hook for shared transient state
</h1>

A simple, tiny, library to automatically handle transient state, such as notifications, messages, or anything else that has a specific lifetime. An alternative to complex state, or messy passing down of state to emit and subscribe to events between children/siblings.

**Tiny** - 675 bytes (minified + gzipped, [bundlephobia](https://bundlephobia.com/result?p=@gilstroem/transient@1.0.2))

## Quick Start

Simple example

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

// Insertion example
import { insert } from "@gilstroem/transient";

function Greet({ name }) {
  return (
    <button onClick={() => insert(`Welcome back, ${name}`)}>Greet me 👋</button>
  );
}
```

## Usage

```
npm install @gilstroem/transient
```

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

## Examples

- [Simple](#simple)
- [Namespaced](#namespaced)
- [Lifetimes](#lifetimes)
- [Dependent Fetching](#dependent-fetching)
- [Notifications use-case example (complex data)](<#notifications-use-case-example-(complex-data)>)

### Simple

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

// Insertion example
import { insert } from "@gilstroem/transient";

function Greet({ name }) {
  return (
    <button onClick={() => insert(`Welcome back, ${name}`)}>Greet me 👋</button>
  );
}
```

### Namespaced

```js
// Subscriber example
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

// Insertion example
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

### Lifetimes

```js
...
insert(`I am here for 5 seconds, the default`);
...
insert(`I will be gone in a second 👋`, 1000);
...
insert(`I will stick around for a minute 🐒`, 60000);
```

### Notifications use-case example (complex data)

> TODO

## Author

- Nikolaj Alexander Gilstroem ([@gilstroem](https://twitter.com/gilstroem)) – [gilstroem.com](https://gilstroem.com)

<br/>

## License

The MIT License.
