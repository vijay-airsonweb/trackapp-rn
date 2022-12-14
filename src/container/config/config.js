/* eslint-disable prettier/prettier */
import io from 'socket.io-client';

export const API_URL = 'http://192.168.1.43:3000';
export const SOCKET = io(API_URL);
