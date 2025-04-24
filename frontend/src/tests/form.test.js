import { mount } from "@vue/test-utils";
import Form from "../components/Form.vue";

describe("Form.vue", () => {
  it("renders the form with all fields and the submit button", () => {
    const wrapper = mount(Form);
    expect(wrapper.find("form").exists()).toBe(true);
    expect(wrapper.find("#title").exists()).toBe(true);
    expect(wrapper.find("#description").exists()).toBe(true);
    expect(wrapper.find("#status").exists()).toBe(true);
    expect(wrapper.find("#priority").exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it("sets default values for the form fields", () => {
    const wrapper = mount(Form);
    expect(wrapper.find("#title").element.value).toBe("");
    expect(wrapper.find("#description").element.value).toBe("");
    expect(wrapper.find("#status").element.value).toBe("todo");
    expect(wrapper.find("#priority").element.value).toBe("medium");
  });

  it('displays "create" on the button when no todo prop is passed', () => {
    const wrapper = mount(Form);
    expect(wrapper.find('button[type="submit"]').text()).toBe("create");
  });
  describe("Form.vue", () => {
    it("renders the form with all fields and the submit button", () => {
      const wrapper = mount(Form);
      expect(wrapper.find("form").exists()).toBe(true);
      expect(wrapper.find("#title").exists()).toBe(true);
      expect(wrapper.find("#description").exists()).toBe(true);
      expect(wrapper.find("#status").exists()).toBe(true);
      expect(wrapper.find("#priority").exists()).toBe(true);
      expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
    });

    it("sets default values for the form fields", () => {
      const wrapper = mount(Form);
      expect(wrapper.find("#title").element.value).toBe("");
      expect(wrapper.find("#description").element.value).toBe("");
      expect(wrapper.find("#status").element.value).toBe("todo");
      expect(wrapper.find("#priority").element.value).toBe("medium");
    });

    it('displays "create" on the button when no todo prop is passed', () => {
      const wrapper = mount(Form);
      expect(wrapper.find('button[type="submit"]').text()).toBe("create");
    });

    it('displays "edit" on the button when a todo prop is passed', () => {
      const todo = {
        title: "Test Title",
        description: "Test Description",
        status: "in-progress",
        priority: "high",
      };
      const wrapper = mount(Form, {
        props: { todo },
      });
      expect(wrapper.find('button[type="submit"]').text()).toBe("edit");
    });

    it("pre-fills form fields when a todo prop is passed", () => {
      const todo = {
        title: "Test Title",
        description: "Test Description",
        status: "in-progress",
        priority: "high",
      };
      const wrapper = mount(Form, {
        props: { todo },
      });
      expect(wrapper.find("#title").element.value).toBe(todo.title);
      expect(wrapper.find("#description").element.value).toBe(todo.description);
      expect(wrapper.find("#status").element.value).toBe(todo.status);
      expect(wrapper.find("#priority").element.value).toBe(todo.priority);
    });

    it('emits "submit" event with form data on form submission', async () => {
      const wrapper = mount(Form);

      await wrapper.find("#title").setValue("New Title");
      await wrapper.find("#description").setValue("New Description");
      await wrapper.find("#status").setValue("done");
      await wrapper.find("#priority").setValue("low");
      await wrapper.find("form").trigger("submit.prevent");

      expect(wrapper.emitted("submit")).toBeTruthy();
      expect(wrapper.emitted("submit")[0][0]).toEqual({
        title: "New Title",
        description: "New Description",
        status: "done",
        priority: "low",
      });
    });
  });
});
