## svelte-mobx ([npm](https://www.npmjs.com/package/svelte-mobx))
Reactive MVVM with [MobX](https://mobx.js.org) & [Svelte](https://svelte.dev)

## Installation

```bash
npm i -S svelte-mobx
```

## Usage ([example repository](https://github.com/xelaok/svelte-mobx-example))

View
```html
// App.svelte

<script context="module">
    import { connect } from "svelte-mobx";
</script>

<script>
    const { autorun } = connect();

    export let vm;

    let formattedCurrentTime;
    let formattedElapsedSeconds;

    $: autorun(() => {
        formattedCurrentTime = vm.formattedCurrentTime;
        formattedElapsedSeconds = vm.formattedElapsedSeconds;
    });
</script>

<div>
    <h1>The time is {formattedCurrentTime}</h1>
    <div>This page has been open for {formattedElapsedSeconds}</div>
</div>
```

View Model

```typescript
// App.vm.ts

class AppVM {
    @observable
    startTime: Date;

    @observable
    currentTime: Date;

    @computed
    get elapsedSeconds(): number {
        return Math.round((this.currentTime.getTime() - this.startTime.getTime()) / 1000);
    }

    @computed
    get formattedCurrentTime(): string {
        return timeFormatter.format(this.currentTime);
    }

    @computed
    get formattedElapsedSeconds(): string {
        return `${this.elapsedSeconds} ${this.elapsedSeconds === 1 ? "second" : "seconds"}`;
    }

    constructor() {
        this.startTime = new Date();
        this.currentTime = this.startTime;
    }

    load() {
        setInterval(() => this.currentTime = new Date(), 100);
    }
}
```
