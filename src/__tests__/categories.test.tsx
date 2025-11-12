import { render, screen } from "@testing-library/react";
import CategoryList from "@/components/CategoryList";

// 1️⃣ Example data
const mockCategories = [
  {
    mainCat: "Electricals",
    subCats: ["Cables", "Batteries"],
  },
];

describe("CategoryList component", () => {
  it("renders main categories and subcategories", () => {
    // 2️⃣ Render the component with props
    render(<CategoryList categories={mockCategories} />);

    // 3️⃣ Check that the main category is in the document
    expect(screen.getByText("Electricals")).toBeInTheDocument();

    // 4️⃣ Check that the subcategories are in the document
    expect(screen.getByText("Cables")).toBeInTheDocument();
    expect(screen.getByText("Batteries")).toBeInTheDocument();
  });
});
