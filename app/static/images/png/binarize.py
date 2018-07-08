import Image
import matplotlib.pyplot as plt
import sys



img = Image.open(sys.argv[1])
filename = sys.argv[1].split('.')[0]
img.convert('RGBA')
pixels = img.load()
for i in range(img.size[0]):
    for j in range(img.size[1]):
        if pixels[i, j][1] == 0:
            pixels[i, j] = (0, 0)
        else:
            pixels[i, j] = (0, 255)
img.save(filename + '_m.png')