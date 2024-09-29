import {
  fetchAdminProductDetails,
  updateProductAction,
  updateProductImageAction,
} from "@/utils/actions";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { SubmitButton } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";
import ImageInputContainer from "@/components/form/ImageInputContainer";
import DiscountInput from "@/components/form/DiscountInput";
import ComboBox from "@/components/form/ComboBox";
import {
  genderOptions,
  styleOptions,
  seasonOptions,
  preferenceOptions,
  durationOptions,
  intensityOptions,
  notesOptions,
} from "@/utils/constants";

async function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = await fetchAdminProductDetails(id);
  const {
    name,
    company,
    description,
    featured,
    price,
    discount,
    gender,
    style,
    preference,
    season,
    intensity,
    duration,
    note,
  } = product;
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        Edição de Produto
      </h1>
      <div className="border p-8 rounded">
        <ImageInputContainer
          action={updateProductImageAction}
          name={name}
          image={product.image}
          text="update image"
        >
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="url" value={product.image} />
        </ImageInputContainer>
        <FormContainer action={updateProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <input type="hidden" name="id" value={id} />
            <FormInput
              type="text"
              name="name"
              label="product name"
              defaultValue={name}
            />
            <FormInput type="text" name="company" defaultValue={company} />
            <PriceInput defaultValue={price} />

            <DiscountInput defaultValue={discount} />

            <ComboBox
              defaultValue={gender}
              name="gender"
              label="Gênero"
              options={genderOptions}
            />

            <ComboBox
              defaultValue={style}
              name="style"
              label="Estilo"
              options={styleOptions}
            />

            <ComboBox
              defaultValue={preference}
              name="preference"
              label="Preferência"
              options={preferenceOptions}
            />

            <ComboBox
              defaultValue={season}
              name="season"
              label="Estação"
              options={seasonOptions}
            />

            <ComboBox
              defaultValue={intensity}
              name="intensity"
              label="Intensidade"
              options={intensityOptions}
            />

            <ComboBox
              defaultValue={duration}
              name="duration"
              label="Duração"
              options={durationOptions}
            />

            <ComboBox
              defaultValue={note}
              name="note"
              label="Nota"
              options={notesOptions}
            />
          </div>
          <TextAreaInput
            name="description"
            labelText="product description"
            defaultValue={description}
          />
          <div className="mt-6">
            <CheckboxInput
              name="featured"
              label="featured"
              defaultChecked={featured}
            />
          </div>
          <SubmitButton text="Editar Produto" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}
export default EditProductPage;
