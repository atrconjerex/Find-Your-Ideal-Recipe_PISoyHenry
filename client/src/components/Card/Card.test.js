import { render, screen } from '@testing-library/react';
import Card from './Card';
const el = {
    ID: 1000,
    name: 'Frijoles',
    diets: ['dairy free'],
    image: 'image.com'
}
test('Debe renderizar el componente Card con al menos el nombre pasado en los parametros', () => {
  render(<Card  key = {el.ID} id={el.ID} name={el.name} diets={el.diets} image={el.image}/>);
  const name = screen.getByText(el.name);
  expect(name).toBeInTheDocument();
});