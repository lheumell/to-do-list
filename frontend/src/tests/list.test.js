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
});
