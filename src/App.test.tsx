import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Login from "./Pages/Signup/Login";
import Signup from "./Pages/Signup/Signup";

describe("Login", () => {
  test("Test for the Login Button", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const button = await screen.getByRole("button", { name: "Login" });
    expect(button).toBeInTheDocument();
  });
  test("Test for the Google Button", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const Googlebutton = await screen.getByRole("button", {
      name: "Use Google Account",
    });
    expect(Googlebutton).toBeInTheDocument();
  });
  test("Test for the Facebook Button", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const Facebookbutton = await screen.getByRole("button", {
      name: "Use Facebook Account",
    });
    expect(Facebookbutton).toBeInTheDocument();
  });
  test("Test for Email text", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText("Email Address")).toBeInTheDocument();
  });
});

describe("Signup", () => {
  test("Test for the Signup Button", async () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );
    const button = await screen.getByRole("button", { name: "Signup" });
    expect(button).toBeInTheDocument();
  });
  test("Test for the Google Button", async () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );
    const Googlebutton = await screen.getByRole("button", {
      name: "Use Google Account",
    });
    expect(Googlebutton).toBeInTheDocument();
  });
  test("Test for the Facebook Button", async () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );
    const Facebookbutton = await screen.getByRole("button", {
      name: "Use Facebook Account",
    });
    expect(Facebookbutton).toBeInTheDocument();
  });
  test("Test for Email text", async () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );
    expect(screen.getByText("Email Address")).toBeInTheDocument();
  });
});
