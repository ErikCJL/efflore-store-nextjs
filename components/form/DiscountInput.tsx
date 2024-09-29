import { Label } from "../ui/label";
import { Input } from "../ui/input";

const name = "discount";
type FormInputNumberProps = {
  defaultValue?: number;
};

function DiscountInput({ defaultValue }: FormInputNumberProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        Discounto %
      </Label>
      <Input
        id={name}
        type="number"
        name={name}
        min={0}
        defaultValue={defaultValue || 0}
        required
      />
    </div>
  );
}
export default DiscountInput;
