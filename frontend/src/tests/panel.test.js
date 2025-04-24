import { mount } from "@vue/test-utils";
import Panel from "../components/UI/Panel.vue";
import { nextTick } from "vue";

describe("Panel.vue", () => {
    describe("Rendering", () => {
        it("renders correctly when isOpen is true", () => {
            const wrapper = mount(Panel, {
                props: {
                    title: "Test Panel",
                    isOpen: true,
                },
            });

            expect(wrapper.find(".z-10").exists()).toBe(true);
            expect(wrapper.find("h2").text()).toBe("Test Panel");
        });

        it("does not render when isOpen is false", () => {
            const wrapper = mount(Panel, {
                props: {
                    title: "Test Panel",
                    isOpen: false,
                },
            });

            expect(wrapper.find(".z-10").exists()).toBe(false);
        });

        it("displays the correct title passed via props", () => {
            const wrapper = mount(Panel, {
                props: {
                    title: "Dynamic Title",
                    isOpen: true,
                },
            });

            expect(wrapper.find("h2").text()).toBe("Dynamic Title");
        });
    });

    describe("Events", () => {
        it("emits onClose event when the close button is clicked", async () => {
            const wrapper = mount(Panel, {
                props: {
                    title: "Test Panel",
                    isOpen: true,
                },
            });

            await wrapper.find("button").trigger("click");
            expect(wrapper.emitted("onClose")).toBeTruthy();
        });

        it("closes the panel when clicking outside of it", async () => {
            const wrapper = mount(Panel, {
                props: {
                    title: "Test Panel",
                    isOpen: true,
                },
                attachTo: document.body, // Required for onClickOutside to work
            });

            // Simulate clicking outside the panel
            document.body.click();
            await nextTick();

            expect(wrapper.emitted("onClose")).toBeTruthy();
        });
    });
});
