import { Experience } from './experience/Experience';
import './index.css';
const experience = Experience.getInstance();

const root = document.querySelector('#root');
root?.append(experience.canvas);
