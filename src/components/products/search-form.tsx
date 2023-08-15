import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IconSearch } from "@tabler/icons-react";

export const SearchForm = (props: { onSearch?: (values: string) => void }) => {
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.onSearch?.(value);
      }}
      className="px-4 py-2 flex gap-2"
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
      />
      <div>
        <Button size="icon" variant="outline">
          <IconSearch strokeWidth={1} />
        </Button>
      </div>
    </form>
  );
};
