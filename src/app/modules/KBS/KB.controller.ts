import { Request, Response } from 'express';
import { KBServices } from './KB.service';
import KBValidationSchema from './KB.validation';

const createKB = async (req: Request, res: Response) => {
  try {
    const KBData = req.body;
    const { error } = KBValidationSchema.validate(KBData);
    const result = await KBServices.createKBinDB(KBData);

    if (error) {
      res.status(400).json({
        success: false,
        message: 'Something is wrong :(',
        error: error.details,
      });
    }

    res.status(200).json({
      success: true,
      message: 'KB is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      succss: false,
      message: 'failed to create data :(',
      error: err,
    });
  }
};

const getAllOrSearchedKBs = async (req: Request, res: Response) => {
  if (Object.keys(req.query).length === 0) {
    try {
      const result = await KBServices.getAllKBsFromDB();
      res.status(200).json({
        success: true,
        message: 'KBs shown successfully',
        data: result,
      });
    } catch (err) {
      res.status(400).json({
        succss: false,
        message: 'failed to get data :(',
      });
    }
  } else {
    try {
      const searchTerm: string | number = req.query.searchTerm as string;
      let result = await KBServices.searchKBFromDB(searchTerm);
      if (result.length === 0) {
        res.status(400).json({
          succss: false,
          message: 'Searched item is not found',
        });
      } else {
        res.status(200).json({
          success: true,
          message: `keyboard Products matching the term ${searchTerm} found successfully!`,
          data: result,
        });
      }
      if (!searchTerm) {
        res.status(400).json({
          succss: false,
          message: 'Search Term is missing in the searchTerm query field',
        });
      }
    } catch (err) {
      res.status(400).json({
        succss: false,
        message: 'failed to get data :(',
      });
    }
  }
};

const getOneKB = async (req: Request, res: Response) => {
  try {
    const KBId = req.params.id;
    const result = await KBServices.getOneKBFromDB(KBId);
    if (result === null) {
      res.status(400).json({
        success: false,
        message: 'specific KB not found :(',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'specific KB shown successfully',
        data: result,
      });
    }
  } catch (err) {
    res.status(400).json({
      succss: false,
      message: 'failed to get data :(',
    });
  }
};

const deleteKB = async (req: Request, res: Response) => {
  try {
    const KBId = req.params.id;
    const result = await KBServices.deleteOneKBFromDB(KBId);
    if (result.deletedCount === 0) {
      res.status(400).json({
        success: false,
        message: 'specific KB not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'specific KB Deleted successfully',
        data: result,
      });
    }
  } catch (err) {
    res.status(400).json({
      succss: false,
      message: 'failed to delete data :(',
    });
  }
};
const UpdateKB = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedKB = req.body;
    const result = await KBServices.updateKBFromDB(id, updatedKB);
    if (result === null) {
      res.status(400).json({
        success: false,
        message: 'specific KB not found :(',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'specific KB updated successfully',
        data: result,
      });
    }
  } catch (err) {
    res.status(400).json({
      succss: false,
      message: 'failed to update data :(',
    });
  }
};

export const KBControllers = {
  createKB,
  getAllOrSearchedKBs,
  getOneKB,
  deleteKB,
  UpdateKB,
};
