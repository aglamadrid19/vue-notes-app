import { mount } from "@vue/test-utils";
import NoteApp from "src/components/NoteApp.vue";
import { describe, it, expect } from "vitest";

describe("NoteApp.vue", () => {

  it("should render appTitle", () => {
    const wrapper = mount(NoteApp, {});

    const appTitle = wrapper.get("#logo")
    expect(appTitle.text()).toEqual("mdi mdi-note Notes App")
  });
});