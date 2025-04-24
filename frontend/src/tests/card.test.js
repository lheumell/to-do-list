import { mount } from "@vue/test-utils";
import Card from "../components/UI/Card.vue";

describe("Card.vue", () => {
  const createWrapper = (todoMock) => {
    return mount(Card, {
      props: { todo: todoMock },
    });
  };

  describe("Rendering", () => {
    it("renders correctly with required props", () => {
      const todoMock = {
        _id: "1",
        title: "Test Todo",
        description: "This is a test todo description",
        priority: "high",
      };

      const wrapper = createWrapper(todoMock);

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find("h3").text()).toBe(todoMock.title);
    });

    it("renders the description correctly", () => {
      const todoMock = {
        _id: "2",
        title: "Another Test Todo",
        description: "This is another test todo description",
        priority: "medium",
      };

      const wrapper = createWrapper(todoMock);

      expect(wrapper.find("p").text()).toBe(todoMock.description);
    });

    it("renders a red indicator when the priority is high", () => {
      const todoMock = {
        _id: "4",
        title: "High Priority Todo",
        description: "This is a high priority todo",
        priority: "high",
      };

      const wrapper = createWrapper(todoMock);

      const redIndicator = wrapper.find("div[aria-label='high-priority']");
      expect(redIndicator.exists()).toBe(true);
    });

    it("does not render a red indicator when the priority is not high", () => {
      const todoMock = {
        _id: "3",
        title: "Low Priority Todo",
        description: "This is a low priority todo",
        priority: "low",
      };

      const wrapper = createWrapper(todoMock);

      const redIndicator = wrapper.find("div[aria-label='high-priority']");
      expect(redIndicator.exists()).toBe(false);
    });
  });

  describe("Events", () => {
    it("emits an event when the card is clicked", async () => {
      const todoMock = {
        _id: "5",
        title: "Clickable Todo",
        description: "This is a clickable todo",
        priority: "medium",
      };

      const wrapper = createWrapper(todoMock);

      await wrapper.trigger("click");
      const emittedEvents = wrapper.emitted("open");
      expect(emittedEvents).toBeTruthy();
      expect(emittedEvents.length).toBe(1);
    });

    it("emits an event when the cross icon is clicked", async () => {
      const todoMock = {
        _id: "6",
        title: "Deletable Todo",
        description: "This is a deletable todo",
        priority: "low",
      };

      const wrapper = createWrapper(todoMock);

      const crossIcon = wrapper.find("button[aria-label='delete']");
      await crossIcon.trigger("click");
      const emittedEvents = wrapper.emitted("delete");
      expect(emittedEvents).toBeTruthy();
      expect(emittedEvents.length).toBe(1);
    });
  });
});
