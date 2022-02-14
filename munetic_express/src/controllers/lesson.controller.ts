import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as status from 'http-status';
import { Gender } from '../models/user';
import { LessonAllInfo, CountRows, LessonEditable } from '../types/service/lesson.service';
import * as LessonServive from '../service/lesson.service';
import { ResJSON, ResponseData } from '../modules/types';
import { Lesson } from '../models/lesson';

/**
 * 새 레슨을 저장하는 미들웨어
 * GET Request -> 200, 400 Response
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author Jonghyun Lim
 * @version 1
 */
export const postLesson: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tutor_id: number = parseInt(req.query.tutor_id as string);
    const newLesson: LessonEditable = req.body;
    if (Number.isNaN(tutor_id)) {
      res.status(status.BAD_REQUEST).send('wrong tutor ID');
    } else if (!newLesson) {
      res.status(status.BAD_REQUEST).send('Invalid data passed');
    } else {
      const response = await LessonServive.createLesson(tutor_id, newLesson);
      const result: ResJSON = new ResJSON(
        '응답에 성공하였습니다.',
        response,
      );
      res.status(status.OK).json(result);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * 레슨 ID에 대한 레슨을 가져오는 미들웨어
 * GET Request -> 200, 400 Response
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author Jonghyun Lim
 * @version 1
 */
export const getLesson: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user_id: number = parseInt(req.params.id as string);
    if (Number.isNaN(user_id) || user_id < 0) {
      res.status(status.BAD_REQUEST).send('offset / limit / user ID error');
    } else {
      const response = await LessonServive.findLessonById(user_id, false);
      const result: ResJSON = new ResJSON(
        '응답에 성공하였습니다.',
        response,
      );
      res.status(status.OK).json(result);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * offset, limit 범위만큼 레슨을 가져오는 미들웨어
 * GET Request -> 200, 400 Response
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author Jonghyun Lim
 * @version 1
 */
export const getLessons: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const offset: number = parseInt(req.query.offset as string);
    const limit: number = parseInt(req.query.limit as string);
    if (Number.isNaN(offset) || Number.isNaN(limit) || offset < 0 || limit < 0) {
      res.status(status.BAD_REQUEST).send('offset / limit error');
    } else {
      const response: Lesson[] = await LessonServive.findLessons(offset, limit, false);
      const result: ResJSON = new ResJSON(
        '응답에 성공하였습니다.',
        response,
      );
      res.status(status.OK).json(result);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * 레슨을 수정하는 미들웨어
 * GET Request -> 200, 400 Response
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author Jonghyun Lim
 * @version 1
 */
export const patchLesson: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const lessonEditable = req.body as LessonEditable;
    const lesson_id: number = parseInt(req.params.id as string);
    if (!lessonEditable || Number.isNaN(lesson_id) || lesson_id < 0) {
      res.status(status.BAD_REQUEST).send('Invalid data');
    } else {
      const response = await LessonServive.editLesson(lesson_id, lessonEditable);
      const result: ResJSON = new ResJSON(
        '응답에 성공하였습니다.',
        response,
      );
      res.status(status.OK).json(result);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * 레슨을 삭제하는 미들웨어
 * GET Request -> 200, 400 Response
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author Jonghyun Lim
 * @version 1
 */
export const deleteLesson: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const lesson_id: number = parseInt(req.params.id as string);
    if (Number.isNaN(lesson_id) || lesson_id < 0) {
      res.status(status.BAD_REQUEST).send('Invalid lesson ID');
    } else {
      const response = await LessonServive.removeLesson(lesson_id);
      const result: ResJSON = new ResJSON(
        '응답에 성공하였습니다.',
        response,
      );
      res.status(status.OK).json(result);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * 특정 사용자의 레슨들을 가져오는 미들웨어
 * GET Request -> 200, 400 Response
 * 
 * @param req request Objrct
 * @param res response Objrct
 * @param next next middleware function Object
 * @author Jonghyun Lim
 * @version 1
 */
export const getUserLessons: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const offset: number = parseInt(req.query.offset as string);
    const limit: number = parseInt(req.query.limit as string);
    const user_id: number = parseInt(req.params.id as string);
    if (Number.isNaN(offset) || Number.isNaN(limit) || Number.isNaN(user_id) || offset < 0 || limit < 0 || user_id < 0) {
      res.status(status.BAD_REQUEST).send('offset / limit / user ID error');
    } else {
      const response: Lesson[] = await LessonServive.findLessonsByUserId(user_id, offset, limit, false);
      const result: ResJSON = new ResJSON(
        '응답에 성공하였습니다.',
        response,
      );
      res.status(status.OK).json(result);
    }
  } catch (err) {
    next(err);
  }
};
