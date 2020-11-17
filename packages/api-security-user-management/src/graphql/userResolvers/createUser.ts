import { GraphQLFieldResolver } from "@webiny/handler-graphql/types";
import { WithFieldsError } from "@commodo/fields";
import { ErrorResponse, Response } from "@webiny/graphql/responses";
import InvalidFieldsError from "@webiny/commodo-graphql/InvalidFieldsError";
import { SecurityUserManagementPlugin } from "../../types";

const resolver: GraphQLFieldResolver = async (root, { data }, context) => {
    const { users } = context;

    try {
        const authPlugin = context.plugins.byName<SecurityUserManagementPlugin>(
            "security-user-management"
        );

        await authPlugin.createUser({ data, user: data }, context);

        const user = await users.create(data);

        return new Response(user);
    } catch (e) {
        if (e.code === WithFieldsError.VALIDATION_FAILED_INVALID_FIELDS) {
            const attrError = InvalidFieldsError.from(e);
            return new ErrorResponse({
                code: attrError.code || WithFieldsError.VALIDATION_FAILED_INVALID_FIELDS,
                message: attrError.message,
                data: attrError.data
            });
        }
        return new ErrorResponse({
            code: e.code,
            message: e.message,
            data: e.data
        });
    }
};

export default resolver;
