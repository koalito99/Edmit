import { Subtract } from '@edmit/component-library/src/lib/typescript'
import {
    Affinity,
    AffordabilityDetermination,
    AidGenerosity,
    AidMeasurement,
    CollegeStatus,
    ComputedValueFragment,
    FinancialGrade,
    SystemValueFragment,
    UserValueFragment, ValueDetermination,
    ValueFragment,
} from './generated'
import {
    EAffordabilityDetermination,
    EAidGenerosity,
    EAidMeasurement,
    ECollegeApplicationStatus,
    EFinancialGrade,
    EGoal, EValueDetermination,
} from '@edmit/component-library/src/shared'

export function fromGQLFinancialGrade(grade: NonNullable<FinancialGrade>): EFinancialGrade {
    switch (grade) {
        case FinancialGrade.A:
            return EFinancialGrade.A
        case FinancialGrade.AMINUS:
            return EFinancialGrade.AMINUS
        case FinancialGrade.BPLUS:
            return EFinancialGrade.BPLUS
        case FinancialGrade.B:
            return EFinancialGrade.B
        case FinancialGrade.BMINUS:
            return EFinancialGrade.BMINUS
        case FinancialGrade.CPLUS:
            return EFinancialGrade.CPLUS
        case FinancialGrade.C:
            return EFinancialGrade.C
    }
}

export function fromGQLAffordabilityDetermination(type: AffordabilityDetermination): EAffordabilityDetermination {
    switch (type) {
        case AffordabilityDetermination.Affordable:
            return EAffordabilityDetermination.Affordable;
        case AffordabilityDetermination.NotAffordable:
            return EAffordabilityDetermination.NotAffordable;
    }
}

export function fromGQLValueDetermination(type: ValueDetermination): EValueDetermination {
    switch (type) {
        case ValueDetermination.GoodValue:
            return EValueDetermination.GoodValue;
        case ValueDetermination.NotGoodValue:
            return EValueDetermination.NotGoodValue;
    }
}

export function fromGQLAidMeasurement(type: AidMeasurement): EAidMeasurement {
    switch (type) {
        case AidMeasurement.HIGH:
            return EAidMeasurement.HIGH;
        case AidMeasurement.MEDIUM:
            return EAidMeasurement.MEDIUM;
        case AidMeasurement.LOW:
            return EAidMeasurement.LOW;
    }
}

export function fromGQLAidGenerosity(type: AidGenerosity): EAidGenerosity {
    switch (type) {
        case AidGenerosity.HIGH:
            return EAidGenerosity.HIGH;
        case AidGenerosity.MEDIUM:
            return EAidGenerosity.MEDIUM;
        case AidGenerosity.LOW:
            return EAidGenerosity.LOW;
    }
}

type Value = ValueFragment;

type UserValue = UserValueFragment;

export function isUserValue(value: any): value is UserValue {
    return Boolean((value as UserValue).__typename.match('User'));
}

export function extractUserValue(userValue: UserValue): string | number | boolean | null {
    switch (userValue.__typename) {
        case 'UserBooleanValue':
            return userValue.booleanValue;
        case 'UserFloatValue':
            return userValue.floatValue;
        case 'UserIntValue':
            return userValue.intValue;
        case 'UserStringValue':
            return userValue.stringValue;

        // nullable
        case 'UserNullableBooleanValue':
            return userValue.nullableBooleanValue;
        case 'UserNullableFloatValue':
            return userValue.nullableFloatValue;
        case 'UserNullableIntValue':
            return userValue.nullableIntValue;
        case 'UserNullableStringValue':
            return userValue.nullableStringValue;
    }
}

type SystemValue = SystemValueFragment;

export function isSystemValue(value: any): value is SystemValue {
    return Boolean((value as SystemValue).__typename.match('System'));
}

export function extractSystemValue(systemValue: SystemValue): string | number | boolean | null {
    switch (systemValue.__typename) {
        case 'SystemBooleanValue':
            return systemValue.booleanValue;
        case 'SystemFloatValue':
            return systemValue.floatValue;
        case 'SystemIntValue':
            return systemValue.intValue;
        case 'SystemStringValue':
            return systemValue.stringValue;

        // nullable
        case 'SystemNullableBooleanValue':
            return systemValue.nullableBooleanValue;
        case 'SystemNullableFloatValue':
            return systemValue.nullableFloatValue;
        case 'SystemNullableIntValue':
            return systemValue.nullableIntValue;
        case 'SystemNullableStringValue':
            return systemValue.nullableStringValue;
    }
}

type ComputedValue = ComputedValueFragment;

export function isComputedValue(value: any): value is ComputedValue {
    return Boolean((value as ComputedValue).__typename.match('Computed'));
}

export function extractComputedValue(
    computedValue: ComputedValue
): string | number | boolean | null {
    switch (computedValue.__typename) {
        case 'ComputedBooleanValue':
            return computedValue.booleanValue;
        case 'ComputedFloatValue':
            return computedValue.floatValue;
        case 'ComputedIntValue':
            return computedValue.intValue;
        case 'ComputedStringValue':
            return computedValue.stringValue;

        // nullable
        case 'ComputedNullableBooleanValue':
            return computedValue.nullableBooleanValue;
        case 'ComputedNullableFloatValue':
            return computedValue.nullableFloatValue;
        case 'ComputedNullableIntValue':
            return computedValue.nullableIntValue;
        case 'ComputedNullableStringValue':
            return computedValue.nullableStringValue;
    }
}

export function extractValue(value: Value): string | number | boolean | null {
    if (isUserValue(value)) {
        return extractUserValue(value);
    } else if (isSystemValue(value)) {
        return extractSystemValue(value);
    } else if (isComputedValue(value)) {
        return extractComputedValue(value);
    } else {
        return null;
    }
}

export function toGQLAffinity(type: EGoal): Affinity {
    switch (type) {
        case EGoal.Value:
            return Affinity.Value;
        case EGoal.Affordability:
            return Affinity.Affordability;
        case EGoal.Earnings:
            return Affinity.Earnings;
    }
}

export function fromGQLAffinity(type: Affinity): EGoal {
    switch (type) {
        case Affinity.Value:
            return EGoal.Value;
        case Affinity.Affordability:
            return EGoal.Affordability;
        case Affinity.Earnings:
            return EGoal.Earnings;
    }
}

export function fromGQLCollegeApplicationStatus(status: CollegeStatus): ECollegeApplicationStatus {
    switch (status) {
        case CollegeStatus.Accepted:
            return ECollegeApplicationStatus.Accepted;
        case CollegeStatus.Applied:
            return ECollegeApplicationStatus.Applied;
        case CollegeStatus.Attending:
            return ECollegeApplicationStatus.Attending;
        case CollegeStatus.Considering:
            return ECollegeApplicationStatus.Considering;
        case CollegeStatus.NotAttending:
            return ECollegeApplicationStatus.NotAttending;

        // adjusted defaults
        case CollegeStatus.Appealing:
            return ECollegeApplicationStatus.Applied;
        case CollegeStatus.NotAppealing:
            return ECollegeApplicationStatus.Applied;
    }
}

export function toGQLCollegeApplicationStatus(status: ECollegeApplicationStatus): CollegeStatus {
    switch (status) {
        case ECollegeApplicationStatus.Accepted:
            return CollegeStatus.Accepted;
        case ECollegeApplicationStatus.Applied:
            return CollegeStatus.Applied;
        case ECollegeApplicationStatus.Attending:
            return CollegeStatus.Attending;
        case ECollegeApplicationStatus.Considering:
            return CollegeStatus.Considering;
        case ECollegeApplicationStatus.NotAttending:
            return CollegeStatus.NotAttending;
    }
}

export function withoutTypename<T extends { __typename: string }>(
    arg: T
): Subtract<T, { __typename: string }> {
    const rest = Object.assign({}, arg);
    delete rest.__typename;
    return rest;
}