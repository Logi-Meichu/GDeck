#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import time

import logging
logging.basicConfig(level=logging.INFO)

sys.path.append('../')
from obswebsocket import obsws, requests


host = "172.16.0.50"
port = 4444
passwd = "gdeck"

class OBS(object):
    def __init__(self, host, port, passwd):
        try:
            self.ws = obsws(host, port, passwd)
            self.ws.connect()
            print('Connected!')
        except Exception as e:
            print(e, file=stderr)

    def ToggleMute(self, *args):
        return self.ws.call(requests.ToggleMute(args[0]))

    def StartRecording(self, *args):
        return self.ws.call(requests.StartRecording())

    def StopRecording(self, *args):
        return self.ws.call(requests.StopRecording())

    def SetMute(self, *args):
        arg = []
        arg.append(args[0])
        arg.append(int(args[1]) > 0)
        return self.ws.call(requests.SetMute(*arg))

    def IncVolume(self, *args):
        v = float(self.GetVolume(args[0]))
        if v <= 0.9:
            v += 0.1
        elif v < 1.0:
            v = 1.0
        return self.ws.call(requests.SetVolume(args[0], v))

    def DecVolume(self, *args):
        v = float(self.GetVolume(args[0]))
        if v >= 0.1:
            v -= 0.1
        elif v > 0:
            v = 0
        return self.ws.call(requests.SetVolume(args[0], v))

    def SetSceneItemPosition(self, *args):
        arg = []
        arg.append(args[1])
        arg.append(float(args[2]))
        arg.append(float(args[2]))
        arg.append(args[0])
        return self.ws.call(requests.SetSceneItemPosition(*arg))

    def GetVolume(self, *args):
        return self.ws.call(requests.GetVolume(*args)).getVolume()

    def exit(self):
        self.ws.disconnect()


if __name__ == '__main__':
    obs = OBS(host, port, passwd)
    if sys.argv[1]:
        func = getattr(obs, sys.argv[1])
        r = func(*sys.argv[2:])
        print(r)
        print('exited')
    obs.exit()
