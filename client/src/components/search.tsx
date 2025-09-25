import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function Search() {
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input type="text" placeholder="search..." />
      <Button type="submit" variant="outline">
        <SearchIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default Search;
