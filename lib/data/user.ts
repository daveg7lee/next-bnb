import { readFileSync, writeFileSync } from 'fs';
import { StoredUserType } from '../../types/user';

const getList = () => {
  const usersBuffer = readFileSync('data/user.json');
  const usersString = usersBuffer.toString();
  if (!usersString) {
    return [];
  }
  const users: StoredUserType[] = JSON.parse(usersString);
  return users;
};

const exist = (email) => {
  const users = getList();
  return users.some((user) => user.email === email);
};

const write = async (users: StoredUserType[]) => {
  writeFileSync('data/user.json', JSON.stringify(users));
};

const find = (email) => {
  const users = getList();
  return users.find((user) => user.email === email);
};

export default { getList, exist, write, find };
