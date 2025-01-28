import { describe, expect, test } from "vitest"

import { render, screen } from "@/tests/react-test-utils"

function Hello() {
  return <div>Hello, world!</div>
}

describe("Hello", () => {
  test("should render", () => {
    render(<Hello />)
    expect(screen.getByText("Hello, world!")).toBeInTheDocument()
  })
})
