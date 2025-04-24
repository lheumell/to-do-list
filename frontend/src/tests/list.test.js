import { mount } from "@vue/test-utils";
import List from "@/components/List.vue";
import { TTodo } from "@/types/todo";
import useTodoActions from "@/composables/useTodoActions";

jest.mock("@/composables/useTodoActions");

describe("List.vue", () => {
  const mockTodos = [
    { _id: "1", title: "Todo 1", description: "Description 1" },
    { _id: "2", title: "Todo 2", description: "Description 2" },
  ];

  const mockProps = {
    title: "My Todos",
    todos: mockTodos,
    status: "todo",
  };

  const mockUseTodoActions = useTodoActions;

  beforeEach(() => {
    mockUseTodoActions.mockReturnValue({
      detectMove: jest.fn(),
      handleDelete: jest.fn(),
      emitOpen: jest.fn(),
    });
  });

  it("renders correctly with props", () => {
    const wrapper = mount(List, {
      props: mockProps,
      global: {
        config: {
          globalProperties: {
            $emit: jest.fn(),
          },
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("h2").text()).toBe(mockProps.title);
    expect(wrapper.findAllComponents({ name: "Card" }).length).toBe(
      mockTodos.length
    );
  });

  it("emits update:todos event on handleDelete", async () => {
    const wrapper = mount(List, {
      props: mockProps,
      global: {
        config: {
          globalProperties: {
            $emit: jest.fn(),
          },
        },
      },
    });

    const card = wrapper.findComponent({ name: "Card" });
    await card.vm.$emit("delete", mockTodos[0]);

    expect(wrapper.emitted("update:todos")).toBeTruthy();
  });

  it("emits open event on emitOpen", async () => {
    const wrapper = mount(List, {
      props: mockProps,
      global: {
        config: {
          globalProperties: {
            $emit: jest.fn(),
          },
        },
      },
    });

    const card = wrapper.findComponent({ name: "Card" });
    await card.vm.$emit("open", mockTodos[0]._id);

    expect(wrapper.emitted("open")).toBeTruthy();
  });

  it("calls detectMove on draggable move event", async () => {
    const wrapper = mount(List, {
      props: mockProps,
      global: {
        config: {
          globalProperties: {
            $emit: jest.fn(),
          },
        },
      },
    });

    const draggable = wrapper.findComponent({ name: "draggable" });
    await draggable.vm.$emit("move", {
      relatedContext: { element: mockTodos[0] },
    });

    expect(mockUseTodoActions().detectMove).toHaveBeenCalled();
  });
});
