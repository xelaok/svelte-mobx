## svelte-mobx ([npm](https://www.npmjs.com/package/svelte-mobx))
[MobX](https://mobx.js.org) connector for [Svelte](https://svelte.dev)

## Installation

```bash
npm i -S svelte-mobx
```

## Usage ([example repository](https://github.com/xelaok/svelte-mobx-example))

```typescript
import App from "./App.svelte";
import { AppVm } from "./App.vm";

new App({
    props: { vm: new AppVm() },
    target: document.body,
});
```

```sveltehtml
// App.svelte

<script context="module">
    import { connect } from "svelte-mobx";
</script>

<script>
    export let vm;
    const { autorun } = connect();

    let currentTimeString;
    let elapsedSecondsString;

    $: autorun(() => {
        currentTimeString = vm.currentTimeString;
        elapsedSecondsString = vm.elapsedSecondsString;
    });
</script>

<div>
    <h1>The time is {currentTimeString}</h1>
    <div>This page has been open for {elapsedSecondsString}</div>
</div>
```

```typescript
// App.vm.ts

export class AppVm {
    startTime: Date = new Date();
    currentTime: Date = new Date();

    constructor() {
        makeAutoObservable(this, {
            startTime: observable,
            currentTime: observable,
            elapsedSeconds: computed,
            currentTimeString: computed,
            elapsedSecondsString: computed,
            updateCurrentTime: action,
        });

        setInterval(() => this.updateCurrentTime(), UPDATE_INTERVAL);
    }

    get elapsedSeconds() {
        return Math.round((this.currentTime.getTime() - this.startTime.getTime()) / 1000);
    }

    get currentTimeString() {
        return timeFormatter.format(this.currentTime);
    }

    get elapsedSecondsString() {
        return `${this.elapsedSeconds} ${this.elapsedSeconds === 1 ? "second" : "seconds"}`;
    }

    updateCurrentTime() {
        this.currentTime = new Date();
    }
}
```
