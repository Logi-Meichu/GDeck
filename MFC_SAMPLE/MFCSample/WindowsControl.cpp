#include "stdafx.h"
#include "WindowsControl.h"
#include <string>

using namespace std;

HBITMAP get_screen_bitmap()
{
	// get the device context of the screen
	HDC hScreenDC = CreateDC(L"DISPLAY", NULL, NULL, NULL);
	// and a device context to put it in
	HDC hMemoryDC = CreateCompatibleDC(hScreenDC);

	int width = GetDeviceCaps(hScreenDC, HORZRES);
	int height = GetDeviceCaps(hScreenDC, VERTRES);

	// maybe worth checking these are positive values
	HBITMAP hBitmap = CreateCompatibleBitmap(hScreenDC, width, height);

	// get a new bitmap
	HBITMAP hOldBitmap = (HBITMAP) SelectObject(hMemoryDC, hBitmap);

	BitBlt(hMemoryDC, 0, 0, width, height, hScreenDC, 0, 0, SRCCOPY);
	hBitmap = (HBITMAP) SelectObject(hMemoryDC, hOldBitmap);

	// clean up
	DeleteDC(hMemoryDC);
	DeleteDC(hScreenDC);

	return hBitmap;
	// now your image is held in hBitmap. You can save it or do whatever with it

}

void save_to_disk(HBITMAP bmp)
{

	wchar_t mypicturespath[256];
	HRESULT result = SHGetFolderPath(NULL, CSIDL_MYPICTURES, NULL, SHGFP_TYPE_CURRENT, mypicturespath);

	//string path({mypicturespath, "\\", "filename.jpg" });

	CImage image;
	image.Attach(bmp);
	image.Save(L"filename.jpg");
}

