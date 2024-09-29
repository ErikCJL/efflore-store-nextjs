import FormInput from "@/components/form/FormInput";
import ComboBox from "@/components/form/ComboBox";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import { createProductAction } from "@/utils/actions";
import ImageInput from "@/components/form/ImageInput";
import PriceInput from "@/components/form/PriceInput";
import DiscountInput from "@/components/form/DiscountInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { faker } from "@faker-js/faker";
import CheckboxInput from "@/components/form/CheckboxInput";
import {
  genderOptions,
  styleOptions,
  seasonOptions,
  preferenceOptions,
  durationOptions,
  intensityOptions,
  notesOptions,
} from "@/utils/constants";

function CreateProduct() {
  // const description = faker.commerce.productDescription();
  const description = faker.lorem.paragraph({ min: 10, max: 12 });

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">Criar Produto</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <FormInput
              type="text"
              name="name"
              label="Nome do Produto"
              defaultValue={""}
            />
            <FormInput
              type="text"
              name="company"
              label="Empresa"
              defaultValue={""}
            />

            <PriceInput />

            <DiscountInput />

            <ComboBox name="gender" label="Gênero" options={genderOptions} />

            <ComboBox name="style" label="Estilo" options={styleOptions} />

            <ComboBox
              name="preference"
              label="Preferência"
              options={preferenceOptions}
            />

            <ComboBox name="season" label="Estação" options={seasonOptions} />

            <ComboBox
              name="intensity"
              label="Intensidade"
              options={intensityOptions}
            />

            <ComboBox
              name="duration"
              label="Duração"
              options={durationOptions}
            />

            <ComboBox name="note" label="Nota" options={notesOptions} />
          </div>

          <TextAreaInput
            name="description"
            labelText="Descrição"
            defaultValue={description}
          />

          <ImageInput />
          <div className="mt-6">
            <CheckboxInput name="featured" label="Destaque" />
          </div>

          <SubmitButton text="Criar Produto" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateProduct;
