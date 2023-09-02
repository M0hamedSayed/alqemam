import { NextFunction, Request, Response } from 'express';
import { IPaginateBody } from '../../types';
import { Op } from 'sequelize';
import { getPagination } from '../../common/utils/pagination';
import { Countries } from '../../common/config/db-config';

export const getCountries_post = async (req: Request, res: Response, _next: NextFunction) => {
  const { page, size, search }: IPaginateBody = req.body;
  const whereCondition = search
    ? { [Op.or]: [{ name: { [Op.like]: `%${search}%` } }, { iso3: { [Op.like]: `%${search}` } }] }
    : null;

  const { offset, limit } = getPagination(page, size);
  const countries = await Countries.findAndCountAll({
    where: whereCondition,
    attributes: ['id', 'name', 'iso3', 'iso2', 'phonecode'],
    limit,
    offset,
  });
  res.status(201).json({
    success: countries.rows.length ? true : false,
    message: countries.rows.length ? 'return data succeed' : 'No data returned',
    data: countries.rows,
    length: countries.count,
  });
};
