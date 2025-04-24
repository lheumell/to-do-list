import { mount } from "@vue/test-utils";
import ProgressBar from "../components/UI/ProgressBar.vue";

describe("ProgressBar.vue", () => {
  const MAX_PROGRESS_VALUE = 100;
  const SCALEFACTOR = 3.5;
  const PADDING = 4;

  it("renders the component correctly", () => {
    const wrapper = mount(ProgressBar, {
      props: { value: 50 },
    });
    expect(wrapper.find("span").text()).toBe("progression");
  });

  it("computes the correct width based on the value prop", () => {
    const value = 50;
    const expectedWidth = `${value * SCALEFACTOR - PADDING}px`;
    const wrapper = mount(ProgressBar, {
      props: { value },
    });
    const progressBar = wrapper.find("div.bg-green-500");
    expect(progressBar.attributes("style")).toContain(
      `width: ${expectedWidth}`
    );
  });

  it("applies the rounded-r-md class when value equals MAX_PROGRESS_VALUE", () => {
    const wrapper = mount(ProgressBar, {
      props: { value: MAX_PROGRESS_VALUE },
    });
    const progressBar = wrapper.find("div.bg-green-500");
    expect(progressBar.classes()).toContain("rounded-r-md");
  });

  it("does not apply the rounded-r-md class when value is less than MAX_PROGRESS_VALUE", () => {
    const wrapper = mount(ProgressBar, {
      props: { value: 50 },
    });
    const progressBar = wrapper.find("div.bg-green-500");
    expect(progressBar.classes()).not.toContain("rounded-r-md");
  });

  it("handles edge case when value is 0", () => {
    const wrapper = mount(ProgressBar, {
      props: { value: 0 },
    });
    const progressBar = wrapper.find("div.bg-green-500");
    expect(progressBar.attributes("style")).toContain("width: 0px");
  });
});
