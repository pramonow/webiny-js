import React from "react";
import { css } from "emotion";
import { useRecoilValue } from "recoil";
import { Elevation } from "@webiny/ui/Elevation";
import { Tabs, Tab } from "@webiny/ui/Tabs";
import { activeElementWithChildrenSelector } from "../../recoil/modules";
import NoActiveElement from "./Sidebar/NoActiveElement";
import SidebarActions from "./Sidebar/SidebarActions";
import ElementStyles from "./Sidebar/ElementStyles";
import { ReactComponent as TouchIcon } from "./Sidebar/icons/touch_app.svg";

const rightSideBar = css({
    boxShadow: "1px 0px 5px 0px rgba(128,128,128,1)",
    position: "fixed",
    right: 0,
    top: 65,
    height: "100%",
    width: 300,
    zIndex: 1
});

const EditorSideBar = () => {
    const element = useRecoilValue(activeElementWithChildrenSelector);

    return (
        <Elevation z={1} className={rightSideBar}>
            <Tabs>
                <Tab label={"style"}>
                    {element ? (
                        <ElementStyles />
                    ) : (
                        <NoActiveElement
                            icon={<TouchIcon />}
                            message={"Select an element on the canvas to activate this panel."}
                        />
                    )}
                </Tab>
                <Tab label={"Element"} disabled={!element}>
                    {element && <SidebarActions element={element} />}
                </Tab>
            </Tabs>
        </Elevation>
    );
};

export default React.memo(EditorSideBar);
