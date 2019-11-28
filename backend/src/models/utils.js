import to from 'await-to-js';

/* eslint-disable import/prefer-default-export */

export const initialize = async (model, data) => {
  if (data.length > 0) {
    const [err] = await to(
      model.bulkCreate(data, {
        fields: Object.keys(data[0]),
        updateOnDuplicate: 'id',
      }),
    );

    if (err) {
      console.warn(
        `problem with adding initial data to ${model.name} table: `,
        err,
      );
    } else {
      console.warn(`initial rows added to ${model.name} table successfully.`);
    }
  }
};
