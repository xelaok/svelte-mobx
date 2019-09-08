import * as mobx from "mobx";
import { onDestroy } from "svelte";

type AutorunFn = (view: () => void) => void;

function connect(): { autorun: AutorunFn } {
    let disposer: mobx.IReactionDisposer;

    onDestroy(() => {
        disposer && disposer();
    });

    return {
        autorun: (view: () => void) => {
            disposer && disposer();
            disposer = mobx.autorun(view);
        },
    };
}

export { connect };
