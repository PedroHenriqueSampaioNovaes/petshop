export type MulterMemoryFile = Pick<
  Express.Multer.File,
  'fieldname' | 'originalname' | 'encoding' | 'mimetype' | 'buffer' | 'size'
>;
