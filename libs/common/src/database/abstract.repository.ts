import { Logger, NotFoundException } from '@nestjs/common';
import {
  ClientSession,
  Connection,
  FilterQuery,
  Model,
  SaveOptions,
  Types,
  UpdateQuery,
} from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(
    protected readonly model: Model<TDocument>,
    private readonly connection: Connection,
  ) {}

  async create(
    document: Omit<TDocument, '_id'>,
    options?: SaveOptions,
  ): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    return (
      await createdDocument.save(options)
    ).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    updateQuery: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model.findOneAndUpdate(
      filterQuery,
      updateQuery,
      {
        lean: true,
        new: true,
      },
    );

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async upsert(
    filterQuery: FilterQuery<TDocument>,
    document: Partial<TDocument>,
  ) {
    return this.model.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    return await this.model.find(filterQuery);
  }

  /*
    Currently transactions will not work as we are not using replica set
    To make transactions work, add a replica set in docker-compose.yml
  */
  async startTransaction(): Promise<ClientSession> {
    const trxn = await this.connection.startSession();
    trxn.startTransaction();
    return trxn;
  }

  async commitTransaction(session: ClientSession) {
    return await session.commitTransaction();
  }

  async abortTransaction(session: ClientSession) {
    return await session.abortTransaction();
  }
}
