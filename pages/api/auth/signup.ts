import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import Data from '../../../lib/data';
import jwt from 'jsonwebtoken';
import { StoredUserType } from '../../../types/user';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const userExist = Data.user.exist({ email: req.body.email });
    if (userExist) {
      res.statusCode = 409;
      res.send('이미 가입된 이메일입니다.');
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const users = Data.user.getList();
    let userId;
    if (users.length === 0) {
      userId = 1;
    } else {
      userId = users[users.length - 1].id + 1;
    }
    const newUser: StoredUserType = {
      id: userId,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: hashedPassword,
      birthday: req.body.birthday,
      profileImage:
        'https://github.com/jerrynim/next-airbnb/blob/master/public/static/image/default_user_profile_image.jpg?raw=true',
    };

    Data.user.write([...users, newUser]);

    const token = jwt.sign(String(newUser.id), process.env.JWT_SECRET);

    res.setHeader(
      'Set-Cookie',
      `access-token=${token}; path=/; expires=${new Date(
        Date.now() + 60 * 60 * 24 * 1000 * 3
      )}; httponly`
    );

    return res.end();
  }
  res.statusCode = 405;
  return res.end();
};
