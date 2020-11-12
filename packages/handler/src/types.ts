import { Plugin, PluginsContainer } from "@webiny/plugins/types";

export type HandlerArgs = any[];

export type HandlerContext<
    C0 = Record<string, any>,
    C1 = Record<string, any>,
    C2 = Record<string, any>,
    C3 = Record<string, any>,
    C4 = Record<string, any>,
    C5 = Record<string, any>,
    C6 = Record<string, any>,
    C7 = Record<string, any>,
    C8 = Record<string, any>,
    C9 = Record<string, any>
> = {
    plugins: PluginsContainer;
    args: HandlerArgs;
    [key: string]: any;
} & C0 &
    C1 &
    C2 &
    C3 &
    C4 &
    C5 &
    C6 &
    C7 &
    C8 &
    C9;

export type HandlerContextPlugin<
    C0 = HandlerContext,
    C1 = HandlerContext,
    C2 = HandlerContext,
    C3 = HandlerContext,
    C4 = HandlerContext,
    C5 = HandlerContext,
    C6 = HandlerContext,
    C7 = HandlerContext,
    C8 = HandlerContext,
    C9 = HandlerContext
> = Plugin & {
    type: "context";
    apply(context: C0 & C1 & C2 & C3 & C4 & C5 & C6 & C7 & C8 & C9): void;
};

export type HandlerPlugin<
    C0 = HandlerContext,
    C1 = HandlerContext,
    C2 = HandlerContext,
    C3 = HandlerContext,
    C4 = HandlerContext,
    C5 = HandlerContext,
    C6 = HandlerContext,
    C7 = HandlerContext,
    C8 = HandlerContext,
    C9 = HandlerContext
> = Plugin & {
    type: "handler";
    handle(context: C0 & C1 & C2 & C3 & C4 & C5 & C6 & C7 & C8 & C9, next: Function): any;
};

export type HandlerErrorPlugin<
    C0 = HandlerContext,
    C1 = HandlerContext,
    C2 = HandlerContext,
    C3 = HandlerContext,
    C4 = HandlerContext,
    C5 = HandlerContext,
    C6 = HandlerContext,
    C7 = HandlerContext,
    C8 = HandlerContext,
    C9 = HandlerContext
> = Plugin & {
    type: "handler-error";
    handle(
        context: C0 & C1 & C2 & C3 & C4 & C5 & C6 & C7 & C8 & C9,
        error: any,
        next: Function
    ): Promise<any>;
};
