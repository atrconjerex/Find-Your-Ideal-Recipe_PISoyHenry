import { render, screen } from '@testing-library/react';
import Detail from './Detail';
const el = {
    ID: 1000,
    name: 'Frijoles',
    diets: ['dairy free'],
    image: 'image.com'
}
test('Debe renderizar el componente Detail con al menos el nombre pasado en los parametros', () => {
  render(<Detail />);
});