import "@testing-library/jest-dom/vitest"

// See https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment.
// @ts-expect-error globalThis is not defined in the Jest environment.
globalThis.IS_REACT_ACT_ENVIRONMENT = true
