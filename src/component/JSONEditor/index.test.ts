import { ListField } from '.';

describe('Structure meta of a Value', () => {
  it('should accept Basic types', () => {
    expect(ListField.metaOf('test')).toStrictEqual({
      type: 'string',
      value: 'test'
    });

    expect(ListField.metaOf('test\n')).toStrictEqual({
      type: 'text',
      value: 'test\n'
    });

    expect(ListField.metaOf(1)).toStrictEqual({
      type: 'string',
      value: 1
    });
  });

  it('should accept plain Object & Array', () => {
    const object = { a: 1 };

    expect(ListField.metaOf(object)).toStrictEqual({
      type: 'object',
      value: object,
      children: [
        {
          type: 'string',
          key: 'a',
          value: 1
        }
      ]
    });

    const array = [1];

    expect(ListField.metaOf(array)).toStrictEqual({
      type: 'array',
      value: array,
      children: [
        {
          type: 'string',
          key: 0,
          value: 1
        }
      ]
    });
  });

  it('should accept nested Object & Array', () => {
    const object = { a: { b: 2 } };

    expect(ListField.metaOf(object)).toStrictEqual({
      type: 'object',
      value: object,
      children: [
        {
          type: 'object',
          key: 'a',
          value: object.a,
          children: [
            {
              type: 'string',
              key: 'b',
              value: 2
            }
          ]
        }
      ]
    });

    const array = [[2]];

    expect(ListField.metaOf(array)).toStrictEqual({
      type: 'array',
      value: array,
      children: [
        {
          type: 'array',
          key: 0,
          value: array[0],
          children: [
            {
              type: 'string',
              key: 0,
              value: 2
            }
          ]
        }
      ]
    });
  });

  it('should accept any kinds of data', () => {
    const value = {
      title: 'test',
      tags: ['test', 'example'],
      links: {
        test: 'https://test.com',
        example: 'https://example.com'
      }
    };

    expect(ListField.metaOf(value)).toStrictEqual({
      type: 'object',
      value,
      children: [
        {
          type: 'string',
          key: 'title',
          value: 'test'
        },
        {
          type: 'array',
          key: 'tags',
          value: value.tags,
          children: [
            {
              type: 'string',
              key: 0,
              value: 'test'
            },
            {
              type: 'string',
              key: 1,
              value: 'example'
            }
          ]
        },
        {
          type: 'object',
          key: 'links',
          value: value.links,
          children: [
            {
              type: 'string',
              key: 'test',
              value: 'https://test.com'
            },
            {
              type: 'string',
              key: 'example',
              value: 'https://example.com'
            }
          ]
        }
      ]
    });
  });
});
