"""
Code for SIFT assignment.
"""
from pylab import array, vstack, sqrt, float64, dot, imshow, show, savefig
from numpy import linalg
from scipy import linalg as sclin
import cv2
import sys
import numpy as np
import Image
import ImageEnhance

# Get matrix of perspective transformation, given 4 pairs of points.
def perspectiveTransform(xy, xaya):
    M = array([], dtype=float64).reshape(0, 9)
    # Make matrix M for arbritatry amount of points
    for i in range(len(xy)):
        xi = xy[i][0]
        yi = xy[i][1]
        xi_ = xaya[i][0]
        yi_ = xaya[i][1]
        M = vstack([M, array([xi, yi, 1, 0, 0, 0, -xi_*xi, -xi_*yi, -xi_])])
        M = vstack([M, array([0, 0, 0, xi, yi, 1, -yi_*xi, -yi_*yi, -yi_])])
    # Take SVD
    U, S, Vt = sclin.svd(M, full_matrices=True)
    # p = last column of V, and because Vt is V transposed, the last row is
    # taken.
    p = Vt[-1]
    return p.reshape((3, 3))


def drawLines(im, linewidth=6, interval=200, color=np.array([255,0,0])):
    for x in range(0, im.shape[0], interval):
        if x == 0:
            im[0:(linewidth/2), :] = color
        elif x + linewidth/2 >= im.shape[0]:
            im[x:im.shape[0], :] = color
        else:
            im[(x-linewidth/2):(x+linewidth/2), :] = color
    for y in range(0, im.shape[1], interval):
        if y == 0:
            im[:, 0:(linewidth/2)] = color
        elif y + linewidth/2 >= im.shape[1]:
            im[:, y:im.shape[1]] = color
        else:
            im[:, (y-linewidth/2):(y+linewidth/2)] = color
    return im


if __name__ == '__main__':
    im1 = cv2.cvtColor(cv2.imread(sys.argv[1]), cv2.COLOR_BGR2RGB)
    SIZE_X = 740
    SIZE_Y = 880

    # matrix = perspectiveTransform([(628, 163), (1666, 147), (2716, 128), \
    #                                (632, 1237), (1675, 1266), (2734, 1219), \
    #                                (632, 2346), (1683, 2337), (2745, 2341)], \
    #                               [(0, 0), (SIZE/2, 0), (SIZE, 0), \
    #                                (0, SIZE/2), (SIZE/2, SIZE/2), (SIZE, SIZE/2), \
    #                                (0, SIZE), (SIZE/2, SIZE), (SIZE, SIZE)]) # (-3, -6)
    matrix = perspectiveTransform([(51, 18), (734, 42), \
                                   (9, 878), (745, 871)], \
                                  [(0, 0), (SIZE_X, 0), \
                                   (0, SIZE_Y), (SIZE_X, SIZE_Y)])
    #im2 = cv2.warpPerspective(im1, linalg.inv(matrix), (800, 800))
    im2 = cv2.warpPerspective(im1, matrix, (SIZE_X, SIZE_Y))
    #im2 = drawLines(im2, linewidth=6, interval=SIZE/10, color=np.array([127,255,127]))
    im_pil = Image.fromarray(im2)
    im_pil = ImageEnhance.Contrast(im_pil).enhance(1.5)
    im_pil = ImageEnhance.Brightness(im_pil).enhance(1.1)
    # Rotate
    # im_pil.show()
    im_pil.save('armyCard.png')