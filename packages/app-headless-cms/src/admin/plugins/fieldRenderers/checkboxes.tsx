import React from "react";
import get from "lodash/get";
import { CmsEditorFieldRendererPlugin } from "@webiny/app-headless-cms/types";
import { i18n } from "@webiny/app/i18n";
import { Checkbox, CheckboxGroup } from "@webiny/ui/Checkbox";

const t = i18n.ns("app-headless-cms/admin/fields/text");

const plugin: CmsEditorFieldRendererPlugin = {
    type: "cms-editor-field-renderer",
    name: "cms-editor-field-renderer-checkboxes-buttons",
    renderer: {
        rendererName: "checkboxes",
        name: t`Checkboxes`,
        description: t`Renders checkboxes, allowing selection of multiple values.`,
        canUse({ field }) {
            return field.multipleValues && get(field, "predefinedValues.enabled");
        },
        render({ field, getBind }) {
            const Bind = getBind();

            const { values: options } = field.predefinedValues;

            return (
                <Bind>
                    <CheckboxGroup label={field.label} description={field.helpText}>
                        {({ onChange, getValue }) => (
                            <React.Fragment>
                                {options.map((option, index) => (
                                    <div key={option.value + index}>
                                        <Checkbox
                                            label={option.label}
                                            value={getValue(option.value)}
                                            onChange={onChange(option.value)}
                                        />
                                    </div>
                                ))}
                            </React.Fragment>
                        )}
                    </CheckboxGroup>
                </Bind>
            );
        }
    }
};

export default plugin;
