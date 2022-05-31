import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.{resolvers}.js`);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);



/*
import { makeExecutableSchema } from '@graphql-tools/schema'
import { loadFilesSync, mergeResolvers, mergeTypeDefs } from '@graphql-tools/load-files'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'


const loadedTypes = loadFilesSync(`${__dirname}/!**!/!*.typeDefs.js`);
const loadedResolvers = loadFilesSync(
    //`${__dirname}/!**!/!*.{queries,mutations}.js` ==> 리팩토링 하면서 쿼리+뮤테이션을 resolvers로 변경함
    `${__dirname}/!**!/!*.resolvers.js`
);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);

export default schema;*/
