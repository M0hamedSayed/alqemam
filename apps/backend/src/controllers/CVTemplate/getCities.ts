/* eslint-disable @typescript-eslint/naming-convention */
import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';
import { getPagination } from '../../common/utils/pagination';
import { Cities, Countries } from '../../common/config/db-config';

export const getCities_post = async (req: Request, res: Response, _next: NextFunction) => {
  const { page, size, search, countryID } = req.body;
  const whereCondition = search ? { name: { [Op.like]: `%${search}%` } } : null;

  const { offset, limit } = getPagination(page, size);
  const cities = await Cities.findAndCountAll({
    where: whereCondition,
    attributes: ['id', 'name', 'country_id', 'country_code'],
    limit,
    offset,
    include: {
      model: Countries,
      where: { id: countryID },
      attributes: ['name'],
    },
  });
  res.status(201).json({
    success: cities.rows.length ? true : false,
    message: cities.rows.length ? 'return data succeed' : 'No data returned',
    data: cities.rows,
    length: cities.count,
  });
};
