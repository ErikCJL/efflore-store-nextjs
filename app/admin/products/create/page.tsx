import FormInput from "@/components/form/FormInput";
import ComboBox from "@/components/form/ComboBox";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import { createProductAction } from "@/utils/actions";
import ImageInput from "@/components/form/ImageInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { faker } from "@faker-js/faker";
import CheckboxInput from "@/components/form/CheckboxInput";
import {
  styleOptions,
  seasonOptions,
  durationOptions,
  intensityOptions,
  notesOptions,
} from "@/utils/constants";

function CreateProduct() {
  // const description = faker.commerce.productDescription();
  const description = faker.lorem.paragraph({ min: 10, max: 12 });

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">create product</h1>
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

            <FormInput type="text" name="note" label="Nota" defaultValue={""} />

            <PriceInput />

            <section className="w-full flex flex-wrap justify-between space-x-4 md:flex-nowrap">
              <ComboBox label="Nota" options={notesOptions} />
            </section>
            <div className="w-full mb-4"></div>

            <section className="w-full flex flex-wrap justify-between  md:flex-nowrap">
              <ComboBox label="Estilo" options={styleOptions} />
              <ComboBox label="Estação" options={seasonOptions} />
              <ComboBox label="Intensidade" options={intensityOptions} />
              <ComboBox label="Duração" options={durationOptions} />
            </section>

            <section className="w-full flex flex-wrap justify-between space-x-4 md:flex-nowrap"></section>
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
