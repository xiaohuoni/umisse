import { useState } from 'react';

export default function () {
  const users = new Set<string>();

  const setNewUser = (user: string) => {
    users.add(user);
  };

  return {
    users,
    setNewUser,
  };
}
