import problemModel from '@/models/problems/ProblemModel';
import problemView from '@/views/ProblemView';
import { ProblemController } from '@/controllers/ProblemController';

const controller = new ProblemController(problemModel, problemView);

controller.initialize();
