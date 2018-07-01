import Image, sys

src_im = Image.open(sys.argv[1])

im = src_im.convert('RGBA')
im = im.rotate(30, expand=1)
im.save(sys.argv[1].split('.')[0] + '_rot.png')